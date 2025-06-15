  async function getEventButton() {
    const popupWidth = 400;
    const popupHeight = 300;
  
    // Calculate centered position
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    // Open centered popup window
    const popup = window.open(
      "",
      "EventDetails",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    // Create the HTML content
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Event Details</title>
        </head>
        <body>
          <h2>Enter Event ID</h2>
          <input type="text" id="eventIdInput" placeholder="Event ID" />
          <button id="fetchBtn">Fetch Event</button>
          <div id="eventDetails" style="margin-top:10px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
          <script>
            // Define fetch logic inside the popup itself
            document.getElementById("fetchBtn").onclick = async function () {
              const id = document.getElementById("eventIdInput").value.trim();
  
              if (!id) {
                alert("Please enter an event ID.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/" + id + "/");
                if (!response.ok) throw new Error("Event not found");
  
                const data = await response.json();
                document.getElementById("eventDetails").innerHTML = \`
                  <strong>Event ID:</strong> \${data.id}<br/>
                  <strong>Title:</strong> \${data.name}<br/>
                  <strong>Start Date:</strong> \${data.startDate}<br/>
                  <strong>End Date:</strong> \${data.endDate}<br/>
                  <strong>Location:</strong> \${data.location}<br/>
                  <strong>Link To Google Maps:</strong> <a href="https://www.google.com/maps/search/?api=1&query=\${data.location}" target="_blank">\${data.location}</a><br/>

                \`;
              } catch (err) {
                document.getElementById("eventDetails").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close(); // Finish writing to the document
  }
  async function DeleteEventButton() {
    const popupWidth = 400;
    const popupHeight = 300;
  
    // Calculate centered position
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    // Open centered popup window
    const popup = window.open(
      "",
      "EventDetails",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    // Create the HTML content
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Event Details</title>
        </head>
        <body>
          <h2>Enter Event ID</h2>
          <input type="text" id="eventIdInput" placeholder="Event ID" />
          <button id="fetchBtn">Fetch Event</button>
          <div id="eventDetails" style="margin-top:10px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
          <script>
            // Define fetch logic inside the popup itself
            document.getElementById("fetchBtn").onclick = async function () {
              const id = document.getElementById("eventIdInput").value.trim();
  
              if (!id) {
                alert("Please enter an event ID.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/" + id + "/", {
                 method: "DELETE"});
                if (!response.ok) throw new Error("Event not found");
                const data = await response.text();
                document.getElementById("eventDetails").innerHTML = data;
              } catch (err) {
                document.getElementById("eventDetails").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close(); // Finish writing to the document
  }

  async function getEventUsersButton() {
    const popupWidth = 400;
    const popupHeight = 400;
  
    // Calculate centered position
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    // Open centered popup window
    const popup = window.open(
      "",
      "EventUsers",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    // Write HTML and embedded script into popup
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Event Users</title>
        </head>
        <body>
          <h2>Enter Event ID</h2>
          <input type="text" id="eventIdInput" placeholder="Event ID" />
          <button id="fetchBtn">See Users</button>
          <div id="userList" style="margin-top:10px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
  
          <script>
            document.getElementById("fetchBtn").onclick = async function () {
              const id = document.getElementById("eventIdInput").value.trim();
  
              if (!id) {
                alert("Please enter an event ID.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/" + id + "/registrations");
  
                if (!response.ok) throw new Error("Users not found for this event");
  
                const users = await response.json();
  
                let usersHtml = "";
  
                if (users.length > 0) {
                  usersHtml = "<strong>Users in Event:</strong><ul>";
                  for (const user of users) {
                    usersHtml += \`<li>\${user.name} (ID: \${user.id}, DOB: \${user.dateOfBirth})</li>\`;
                  }
                  usersHtml += "</ul>";
                } else {
                  usersHtml = "<strong>No users found for this event.</strong>";
                }
  
                document.getElementById("userList").innerHTML = usersHtml;
              } catch (err) {
                document.getElementById("userList").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close(); // Finalize writing to the popup
  }
  async function getScheduleButton() {
        const popupWidth = 400;
        const popupHeight = 300;
      
        // Calculate centered position
        const left = window.screenX + (window.outerWidth - popupWidth) / 2;
        const top = window.screenY + (window.outerHeight - popupHeight) / 2;
      
        // Open centered popup window
        const popup = window.open(
          "",
          "EventDetails",
          `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
        );
      
        if (!popup) {
          alert("Popup blocked! Please allow popups.");
          return;
        }
      
        // Create the HTML content
        popup.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Event Details</title>
            </head>
            <body>
              <h2>Enter Event ID</h2>
              <input type="date" id="StartDate" placeholder="Start Date" />
              <input type="date" id="EndDate" placeholder="End Date" />
              <button id="fetchBtn">Fetch Event</button>
              <div id="eventDetails" style="margin-top:10px;"></div>
              <button id="closeBtn" style="margin-top:20px;">Close</button>
              <script>
                // Define fetch logic inside the popup itself
                document.getElementById("fetchBtn").onclick = async function () {
                  const startDate = document.getElementById("StartDate").value.trim();
                  const endDate = document.getElementById("EndDate").value.trim();
      
                  try {
                    const response = await fetch("http://localhost:5201/api/Events/schedule?startDate="+ startDate +"&endDate=" + endDate);
                    if (!response.ok) throw new Error("Event not found");
                    const data = await response.json();

                   let html = "";

                    if (data.length === 0) {
                    html = "<strong>No events found on this date.</strong>";
                    } else {
                    html = "<strong>Events:</strong><ul>";
                    for (const event of data) {
                        html += \`
                            <li>
                                <strong>ID:</strong> \${event.id}<br/>
                                <strong>Title:</strong> \${event.name}<br/>
                                <strong>Start:</strong> \${event.startDate}<br/>
                                <strong>End:</strong> \${event.endDate}<br/>
                                <strong>Location:</strong> \${event.location}<br/>
                                <hr/>
                            </li>
                            \`;
                    }
                    html += "</ul>";
                    }

                document.getElementById("eventDetails").innerHTML = html;
                  } catch (err) {
                    document.getElementById("eventDetails").innerHTML =
                      '<span style="color:red;">' + err.message + '</span>';
                  }
                };
      
                document.getElementById("closeBtn").onclick = () => window.close();
              </script>
            </body>
          </html>
        `);
      
        popup.document.close(); // Finish writing to the document
  }
  async function getEventWeatherButton() {
    const popupWidth = 400;
    const popupHeight = 300;
  
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    const popup = window.open(
      "",
      "EventDetails",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Event Weather</title>
        </head>
        <body>
          <h2>Enter Event ID</h2>
          <input type="text" id="eventIdInput" placeholder="Event ID" />
          <button id="fetchBtn">Fetch Weather</button>
          <div id="eventDetails" style="margin-top:10px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
  
          <script>
            document.getElementById("fetchBtn").onclick = async function () {
              const id = document.getElementById("eventIdInput").value.trim();
  
              if (!id) {
                alert("Please enter an event ID.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/" + id + "/weather");
                if (!response.ok) throw new Error("Event not found");
  
                const data = await response.json();
  
                document.getElementById("eventDetails").innerHTML = \`
                  <strong>Temperature:</strong> \${data.temperature}°C<br/>
                  <strong>Description:</strong> \${data.weatherDescription}<br/>
                  <strong>Wind Speed:</strong> \${data.windSpeed} km/h<br/>
                \`;
              } catch (err) {
                document.getElementById("eventDetails").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close();
  }
  async function createNewEventButton() {
    const popupWidth = 450;
    const popupHeight = 500;
  
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    const popup = window.open(
      "",
      "CreateEvent",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Create New Event</title>
        </head>
        <body>
          <h2>Create New Event</h2>
          <label>Title:</label><br/>
          <input type="text" id="eventName" placeholder="Event Name" /><br/><br/>
          
          <label>Start Date & Time:</label><br/>
          <input type="datetime-local" id="startDate" /><br/><br/>
          
          <label>End Date & Time:</label><br/>
          <input type="datetime-local" id="endDate" /><br/><br/>
          
          <label>Max Registrations:</label><br/>
          <input type="number" id="maxRegistrations" /><br/><br/>
          
          <label>Location:</label><br/>
          <input type="text" id="location" placeholder="Location" /><br/><br/>
          
          <button id="createBtn">Create Event</button>
          <div id="response" style="margin-top:15px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
  
          <script>
            document.getElementById("createBtn").onclick = async function () {
              const name = document.getElementById("eventName").value.trim();
              const startDate = document.getElementById("startDate").value;
              const endDate = document.getElementById("endDate").value;
              const maxRegistrations = parseInt(document.getElementById("maxRegistrations").value);
              const location = document.getElementById("location").value.trim();
  
              if (!name || !startDate || !endDate || isNaN(maxRegistrations) || !location) {
                alert("Please fill in all fields correctly.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/event", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    name,
                    startDate,
                    endDate,
                    maxRegistrations,
                    location
                  })
                });
  
                const resultText = await response.text();
  
                document.getElementById("response").innerHTML =
                  response.ok
                    ? '<span style="color:green;">' + resultText + '</span>'
                    : '<span style="color:red;">' + resultText + '</span>';
              } catch (err) {
                document.getElementById("response").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close();
  }
  async function registerUserToEventButton() {
    const popupWidth = 450;
    const popupHeight = 500;
  
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    const popup = window.open(
      "",
      "CreateEvent",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Create New Event</title>
        </head>
        <body>
          <h2>Create New Event</h2>
          <label>Title:</label><br/>
          <input type="text" id="eventid" placeholder="Event ID" /><br/><br/>
          <input type="text" id="Name" placeholder="Name" /><br/><br/>
          <label>Date</label><br/>
          <input type="date" id="endDate" placeholder="Date Of Birth?" /><br/><br/>
          
          <button id="registerBtn">Register</button>
          <div id="response" style="margin-top:15px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
  
          <script>
            document.getElementById("registerBtn").onclick = async function () {
              const eventId = document.getElementById("eventid").value.trim();
              const name = document.getElementById("Name").value;
              const dateOfBirth = document.getElementById("endDate").value;
  
              if (!eventId || !name || !dateOfBirth) {
                alert("Please fill in all fields correctly.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/"+eventId+"/registrations", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    name,
                    dateOfBirth
                  })
                });
  
                const resultText = await response.text();
  
                document.getElementById("response").innerHTML =
                  response.ok
                    ? '<span style="color:green;">' + resultText + '</span>'
                    : '<span style="color:red;">' + resultText + '</span>';
              } catch (err) {
                document.getElementById("response").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close();
  }
  async function updateEventButton() {
    const popupWidth = 450;
    const popupHeight = 500;
  
    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;
  
    const popup = window.open(
      "",
      "CreateEvent",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  
    if (!popup) {
      alert("Popup blocked! Please allow popups.");
      return;
    }
  
    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Update Event</title>
        </head>
        <body>
          <h2>Update Event</h2>
          <input type="text" id="eventID" placeholder="Event ID" /><br/><br/>
          <label>Title:</label><br/> 
          <input type="text" id="eventName" placeholder="Event Name" /><br/><br/>
          
          <label>Start Date & Time:</label><br/>
          <input type="datetime-local" id="startDate" /><br/><br/>
          
          <label>End Date & Time:</label><br/>
          <input type="datetime-local" id="endDate" /><br/><br/>
          
          <label>Max Registrations:</label><br/>
          <input type="number" id="maxRegistrations" /><br/><br/>
          
          <label>Location:</label><br/>
          <input type="text" id="location" placeholder="Location" /><br/><br/>
          
          <button id="createBtn">Update Event</button>
          <div id="response" style="margin-top:15px;"></div>
          <button id="closeBtn" style="margin-top:20px;">Close</button>
  
          <script>
            document.getElementById("createBtn").onclick = async function () {
              const name = document.getElementById("eventName").value.trim();
              const eventID = document.getElementById("eventID").value.trim();
              const startDate = document.getElementById("startDate").value;
              const endDate = document.getElementById("endDate").value;
              const maxRegistrations = parseInt(document.getElementById("maxRegistrations").value);
              const location = document.getElementById("location").value.trim();
  
              if (!name || !startDate || !endDate || !eventID || !location || isNaN(maxRegistrations)) {
                alert("Please fill in all fields correctly.");
                return;
              }
  
              try {
                const response = await fetch("http://localhost:5201/api/Events/"+eventID+"/", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    name,
                    startDate,
                    endDate,
                    maxRegistrations,
                    location
                  })
                });
  
                const resultText = await response.text();
  
                document.getElementById("response").innerHTML =
                  response.ok
                    ? '<span style="color:green;">' + resultText + '</span>'
                    : '<span style="color:red;">' + resultText + '</span>';
              } catch (err) {
                document.getElementById("response").innerHTML =
                  '<span style="color:red;">' + err.message + '</span>';
              }
            };
  
            document.getElementById("closeBtn").onclick = () => window.close();
          </script>
        </body>
      </html>
    `);
  
    popup.document.close();
  }
   
  