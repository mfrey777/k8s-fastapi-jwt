import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;

interface FunctionalComponentProps {
  info: string;
}

const FunctionalComponent = (props: FunctionalComponentProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Content>
      <h1>{t('Title')}</h1>
      <div>{props.info}</div>
    </Content>
  );
};

export default FunctionalComponent;
