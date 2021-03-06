const postedBy = async (parent, args, context) => {
  const link = context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
  return link;
};

const votes = (parent, args, context) => {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
};

export default { postedBy, votes };
