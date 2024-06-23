import { Text } from '~/components/ui/text';

type Props = {
  title: string;
  description: string;
};

export const TitlePage = (props: Props) => (
  <div className="mb-12">
    <Text tag="h1" variant="heading-2" className="mb-1">
      {props.title}
    </Text>

    <Text className="md:w-6/12">{props.description}</Text>
  </div>
);
