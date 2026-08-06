import {
  Code2,
  Server,
  Cpu,
  LayoutGrid,
  BarChart3,
  Compass,
  type LucideProps,
} from "lucide-react";

const registry = {
  code: Code2,
  server: Server,
  cpu: Cpu,
  layout: LayoutGrid,
  "bar-chart": BarChart3,
  compass: Compass,
} as const;

export type IconName = keyof typeof registry;

interface IconProps extends LucideProps {
  name: IconName;
}

/** Single lookup point so service data can reference icons by string key. */
export default function Icon({ name, ...props }: IconProps) {
  const Component = registry[name];
  return <Component {...props} />;
}
