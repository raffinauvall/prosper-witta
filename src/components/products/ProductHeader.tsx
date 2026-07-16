type CardProps = {
  Icon: React.ElementType
  color: string
  title: string
  desc: string
  headingTag?: "h1" | "p"
}

export default function ProductHeader({
  Icon,
  color,
  title,
  desc,
  headingTag: Heading = "h1",
}: CardProps) {
  return (
    <div className="mb-6">
      <div className={`flex items-center gap-2 text-${color}-600 mb-3`}>
        <Icon size={22} />
        <span className="text-sm pt-1 font-semibold uppercase">
          {title}
        </span>
      </div>

      <Heading className="text-4xl font-bold text-gray-900 leading-tight">
        {desc}
      </Heading>
    </div>
  );
}
