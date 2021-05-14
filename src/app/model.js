import apiClient from './api_client';
import driverFactory from './domain/driver.factory';
import Result from './domain/Result';

// TODO: Complete this function to return an array of results
export async function list(year, stage) {
	const dataFromtheApi = await apiClient.list(year, stage);

	return dataFromtheApi.MRData.RaceTable.Races[0].Results.map((rawResult) => {
		// TODO: Create a driver from the raw result from the api
		const driver = driverFactory.create();

		// TODO: Create a Result using the driver and the rawResult from the api
		const result = new Result();

		return result;
	});
}

const model = {
	list,
};

export default model;
