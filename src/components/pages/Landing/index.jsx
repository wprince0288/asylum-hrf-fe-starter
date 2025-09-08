import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import { decodeBase64 } from '../../../utils/decodeBase64.js';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */
export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  const handleReadMore = () => {
    window.location.href = "https://humanrightsfirst.org/";
  };

  const handleViewData = () => {
    navigate("/graphs");
  };

  const handleDownladData = () => {
    downloadCSV();
  };


  return (
    <main className="flex-c w-[100vw] secondary-c">

      <header className="flex flex-col primary-c pt-4 pb-8 bg-[rgb(102,101,85)]">
        <div className="flex-c mx-auto">
          <h1 className="text-6xl mb-8 text-white">
            Asylum Office Grant Rate Tracker
          </h1>
        </div>
        <div>
          <h3 className="text-white">
            The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </header>

      {/* <div> */}
      <section class="graphs flex-c pt-10">
        <div class="flex-c">
          <div class="flex justify-center m-14 gap-20 text-2x1">
            <div class="flex-c gap-3">
              <img src={barGraph} alt class="h-[300px] w[500px]" />
              <h3>Search Grant Rates By Office</h3>
            </div>
            <div class="flex-c gap-3">
              <img src={pieChart} alt class="h-[300px] w[500px]" />
              <h3>Search Grant Rates By Nationality</h3>
            </div>
            <div class="flex-c gap-3">
              <img src={lineGraph} alt class="h-[300px] w[500px]" />
              <h3>Search Grant Rates Over Time</h3>
            </div>
          </div>

          <section className="flex justify-center space-x-8">
            <button
              onClick={handleViewData}
              className="px-[10px] py-[5px] bg-[rgb(170,170,170)] font-semibold text-md text-white square-lg"
            >
              View the Data
            </button>
            <button
              onClick={handleDownladData}
              className="px-[10px] py-[5px] bg-[rgb(170,170,170)] font-semibold text-md text-white square-lg"
            >
              Download the Data
            </button>
          </section>

        </div>
      </section>

      {/* </div> */}


      <div className='flex'>
        <div>
          <img src={paperStack} />
        </div>
        <p>
          Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021 by the USCIS Asylum Office, which we received through a Freedom of Information Act request. You can search for information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
        </p>
      </div>

      <section className='p-6'>
        <h3>Systemic Disparity Insights </h3>
        <div className='flex'>
          <article>
            <h4>36%</h4>
            <p>By the end of the Trump administration, the average asylum office grant rate had fallen 36% from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal year 20202.</p>
          </article>
          <article>
            <h4>5%</h4>
            <p>The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.</p>
          </article>
          <article>
            <h4>6x lower</h4>
            <p>Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was 6 times lower than the San Francisco asylum office.</p>
          </article>
        </div>

        <div className='flex-c'>
          <button onClick={handleReadMore}>Read More</button>
          <button onClick={scrollToTop}>Back to Top^</button>
        </div>
      </section>

    </main >
  );
};
