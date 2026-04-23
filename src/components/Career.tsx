import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Working Student Backend Developer</h4>
                <h5>Ison GmbH · Hamburg, Germany</h5>
              </div>
              <h3>2024–2026</h3>
            </div>
            <p>
              Designed and deployed a microservices-based backend architecture
              (Python, Docker, Kubernetes) integrating PV, battery, and heat-pump
              systems, centralizing analytics and improving forecasting accuracy.
              Optimized scheduler execution windows across 100+ recurring jobs using
              SQL (PostgreSQL), reducing cloud compute costs by 30% without
              impacting SLAs. Built a sensor data warehousing pipeline using Azure
              IoT Hub enabling ingestion of millions of time-series events per day.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer (Part Time)</h4>
                <h5>Amsight GmbH · Hamburg, Germany</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Contributed to a low-code application in TypeScript for additive
              manufacturing workflows. Designed a generalized data modeling
              approach supporting structured and unstructured manufacturing data,
              and optimized processing flows to reduce end-to-end latency by ~30%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Quant Research Analyst</h4>
                <h5>Tara Capital Partners · Mumbai, India (Remote)</h5>
              </div>
              <h3>2022–2023</h3>
            </div>
            <p>
              Built Power BI dashboards for portfolio analytics, automating
              reporting and reducing report generation time by 25%. Developed
              real-time financial data pipelines on AWS (Kinesis, Lambda, Glue,
              Airflow) for high-frequency market data, and automated risk monitoring
              and anomaly detection pipelines using Python and SQL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
