import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'Juny出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'planet',
          title: '长风破浪会有时',
          href: 'https://www.baidu.com/',
          blankTarget: true,
        },
        {
          key: 'codeNav',
          title: '为您导航',
          href: 'https://www.baidu.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> Juny GitHub</>,
          href: 'https://github.com/Junyjjy',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
