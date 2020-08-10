const links = async (parent, args, context) => {
  const links = context.prisma.user
    .findOne({ where: { id: parent.id } })
    .links();
  return links;
};

export default { links };
