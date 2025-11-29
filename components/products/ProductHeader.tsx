type CardProps = {
  selected: number | string  // sesuain
  Icon: React.ElementType
  color: string
  title: string
  desc: string
}

export default function ProductHeader({ selected, Icon, color, title, desc }: CardProps) {
  return (
    <div className="mb-12">
      <div className={`flex items-center gap-2 ${color} mb-3`}>
        <Icon size={22} />
        <span className="text-sm pt-1 font-semibold uppercase">
          {title}
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
        {desc}
      </h1>
    </div>
  );
}
