import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faUsers, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "react-calendar/dist/Calendar.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    skills: false,
    batches: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  useEffect(() => {
    let chartInstance;

    const ctx = document.getElementById("revenueChart")?.getContext("2d");

    if (ctx) {
      if (chartInstance) chartInstance.destroy(); // Destroy existing chart if it exists

      chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Admissions",
              data: [10, 20, 15, 25, 30, 35],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Admissions Overview" },
          },
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true },
          },
        },
      });
    }

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev); // Toggle sidebar open/close

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    { text: "Dashboard", icon: "fas fa-tachometer-alt", link: "#dashboard" },
    {
      text: "Skills & Courses",
      icon: "fas fa-briefcase",
      hasDropdown: true,
      dropdownItems: [
        { text: "Add New", link: "#add-new" },
        { text: "View All", link: "#view-all" },
      ],
    },
    {
      text: "Batches",
      icon: "fas fa-users",
      hasDropdown: true,
      dropdownItems: [
        { text: "Batch A", link: "#batch-a" },
        { text: "Batch B", link: "#batch-b" },
        { text: "Batch C", link: "#batch-c" },
      ],
    },
    { text: "Trainee's Profile", icon: "fas fa-user", link: "#trainee-profile" },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="logo">
          HTA
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <a
                href="#"
                onClick={() => item.hasDropdown && toggleDropdown(item.text)}
              >
                <i className={item.icon}></i>
                <span className="menu-text">{item.text}</span>
                {item.hasDropdown && (
                  <i
                    className={`fas fa-chevron-down dropdown-icon ${dropdownOpen[item.text] ? "open" : ""}`}
                  ></i>
                )}
              </a>
              {item.hasDropdown && dropdownOpen[item.text] && (
                <ul className="dropdown-menu open">
                  {item.dropdownItems.map((dropdownItem, i) => (
                    <li key={i}>
                      <a href={dropdownItem.link}>{dropdownItem.text}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Invite Friend Section */}
        <div className="invite-section">
          <img src="/female.png" alt="Invite Friend" style={{ width: "100%", borderRadius: "8px" }} />
          <div className="invite-text">
            <h3>Invite Friend</h3>
            <button className="invite-button">Get the link</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "with-sidebar" : "full-width"}`}>
        <div className="dashboard">
          {/* Summary Section */}
          <div className="finance-summary">
            {[{ label: "TRAINEE", icon: faUser }, { label: "SKILLS/COURSES", icon: faBook }, { label: "BATCHES", icon: faUsers }].map((item, i) => (
              <div className="summary-item" key={i}>
                <a href="#">
                  <h3>
                    <FontAwesomeIcon icon={item.icon} className="fas" />
                    {` ${item.label}`}
                  </h3>
                </a>
                <div className="loader"></div>
              </div>
            ))}
          </div>

          {/* Chart and Calendar */}
          <div className="chart-calendar-container">
            <div className="revenue-chart">
              <h4>ADMISSION OVERVIEW</h4>
              <canvas id="revenueChart" width={400} height={200}></canvas>
            </div>
            <div className="calendar">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=America%2FNew_York"
                title="Google Calendar"
              ></iframe>
            </div>
          </div>

          {/* Summary Table */}
          <div className="summary-table">
            <h4>Summary Table</h4>
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                  <th>Column 3</th>
                  <th>Column 4</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((row) => (
                  <tr key={row}>
                    {[1, 2, 3, 4].map((col) => (
                      <td key={col}>
                        <a href={`#row${row}-col${col}`}>Row {row}</a>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
