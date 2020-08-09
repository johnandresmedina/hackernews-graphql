const postedBy = async (parent, args, context) => {
  const link = context.prisma.link
    .findOne({ where: { id: parent.id } })
    .postedBy();
  return link;
};

const votes = (parent, args, context, info) => {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
};

module.exports = {
  postedBy,
  votes,
};
