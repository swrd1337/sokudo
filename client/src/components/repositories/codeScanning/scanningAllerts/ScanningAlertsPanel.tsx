import { SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCodeScanningAlerts } from '../../../../api/repositoriesApi';
import CodeScanningAlert from '../../../../utilities/types/security/CodeScanningAlert';
import User from '../../../../utilities/types/User';
import CenteredSpinner from '../../../common/CenteredSpinner';
import NoAlertsMessage from '../NoAlertsMessage';
import AlertCard from './AlertCard';

type Props = {
  user: User,
  createTaskHandler(_t: string, _d: string): void,
}

function ScanningAlertsPanel({ user, createTaskHandler }: Props) {
  const { owner, repo } = useParams();

  const [scanningAlerts, setScanningAlerts] = useState<CodeScanningAlert[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (user && owner && repo) {
      const fetchAllerts = async () => {
        try {
          const data = await fetchCodeScanningAlerts(owner, repo, user.accessToken);
          setScanningAlerts(data);
        } catch (error: any) {
          setErrorMessage(error.message);
        }
      };
      fetchAllerts();
    }
  }, []);

  if (errorMessage) {
    return <NoAlertsMessage message={errorMessage} />;
  }

  let component;
  if (scanningAlerts.length) {
    component = (
      <SimpleGrid
        columns={{
          sm: 1,
          lg: 2,
          '2xl': 3,
        }}
        gap={10}
        justifyItems="center"
      >
        {scanningAlerts.map((item) => (
          <AlertCard key={item.number} item={item} onCreate={createTaskHandler} />
        ))}
      </SimpleGrid>
    );
  } else {
    component = <CenteredSpinner />;
  }

  return component;
}

export default ScanningAlertsPanel;
