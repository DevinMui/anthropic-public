import { FiMail, FiPlus } from 'react-icons/fi';
import IngesterProvider from '../IngesterProvider';
import { FaSlack } from 'react-icons/fa';

const ingesterProviderDisplay = {
  [IngesterProvider.EMAIL]: { name: 'Email', icon: FiMail },
  [IngesterProvider.SLACK]: { name: 'Slack', icon: FaSlack },
  [IngesterProvider.NONE]: {
    name: 'Add Integration',
    icon: FiPlus,
    subtext: 'Connect workspace to 100+ apps',
  },
};

export default ingesterProviderDisplay;
