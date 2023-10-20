import * as mainServices from '../../services/mainServices.js';

const showMain = async ({render}) => {
  try {
    // await mainServices.alterTable();
    // Fetch application statistics
    const statisticsResult = await mainServices.getStatistics();
    // console.log(statisticsResult);
    const statistics = statisticsResult[0];
    // Render the main page (main.eta) with the statistics
    const data = {statistics: statistics};
    render('main.eta', data);
  } catch (error) {
    // Handle any database-related errors
    console.error('Database error:', error);
    // Render an error page or handle the error as needed
  }
};

export {showMain};
