const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
};

const post = async (parent, args, context) => {
  const userId = getUserId(context);

  const newLink = await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });
  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
};

const updateLink = async (parent, args, context) => {
  const userId = getUserId(context);

  const link = context.prisma.link.update({
    where: { id: parseInt(args.id) },
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });
  return link;
};

const deleteLink = async (parent, args, context) => {
  const link = context.prisma.link.delete({ where: { id: parseInt(args.id) } });
  return link;
};

const vote = async (parent, args, context, info) => {
  const userId = getUserId(context);

  const vote = await context.prisma.vote.findOne({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });

  context.pubsub.publish("NEW_VOTE", newVote);
  return newVote;
};

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote,
};
