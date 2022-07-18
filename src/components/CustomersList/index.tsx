import { Box, List } from '@mui/material';

import LoadingResults from '../LoadingResults';
import NoResults from '../NoResults';
import EmptyList from '../EmptyList';

import styles from './styles';
import { CustomerData } from '../../pages/Home';
import Customer from '../Customer';

interface Props {
	customers: CustomerData[] | null;
	reloadPage: boolean;
	setReloadPage: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	emptyList: boolean;
}

function CustomersList({
	customers,
	reloadPage,
	setReloadPage,
	loading,
	emptyList,
}: Props) {
	if (loading) return <LoadingResults />;

	if (customers?.length === 0 && emptyList) return <EmptyList />;

	return (
		<Box sx={styles.page}>
			{customers?.length === 0 && <NoResults />}

			<List sx={styles.customersList}>
				{customers?.map((customer) => (
					<Customer
						key={customer._id}
						customer={customer}
						reloadPage={reloadPage}
						setReloadPage={setReloadPage}
					/>
				))}
			</List>
		</Box>
	);
}

export default CustomersList;
