<template>
  <div>
      <table border="0" class="wallchart-container" style="opacity: 1;">
        <thead>
        <tr class="header pager-container">
          <td class="person-cell dept-filter">
            <div class="favourite-department hidden-xs" data-favourite="190956" style="display: none">
            </div>
            <div class="chosen-container chosen-container-single snazzy chosen-container-single-nosearch" title="" id="department_select_chosen" style="width: 190px; display: none;"><a class="chosen-single">
              <span>Bridge</span>
              <div><b></b></div>
            </a>
              <div class="chosen-drop">
                <div class="chosen-search">
                  <input class="chosen-search-input" type="text" autocomplete="off" readonly="">
                </div>
                <ul class="chosen-results"></ul>
              </div></div>

            <select id="department-select" aria-label="Select a department" class="snazzy" novalidate="novalidate" style="display: none;">
              <option class="dept " alttext="All departments" value="0">All departments</option>
              <option class="dept " alttext="Department managers" value="-1">Department mana..</option>
              <option class="dept " alttext="Users I approve" value="-3">Users I approve</option>
              <option class="dept  favourite-user" alttext="My favourites" value="-2">My favourites</option>

              <option class="dept  mine" alttext="Bridge" value="190956" selected="">Bridge</option>
            </select></td>
          <td id="pager-container">
            <div>
              <div class="pager" style="">
                <input id="start" type="hidden" value="2023-08-01">
                <input id="end" type="hidden" value="2023-08-07">
                <input id="pageLoadStart" type="hidden" value="2023-08-21">
                <input id="pageLoadEnd" type="hidden" value="2023-09-21">
                <input id="defaultDepartmentId" type="hidden" value="190956">
                <input id="userDefaultDepartmentId" type="hidden" value="190956">

                <div class="date-range">
                  <a href="#" id="wallchart-prev" class="prev ripple noselect">
                    <i class="material-icons">arrow_back</i>
                  </a>
                  <a href="#" id="wallchart-next" class="next ripple noselect">
                    <i class="material-icons">arrow_forward</i>
                  </a>
                  <span id="date-range">01-Aug — 07-Aug</span>
                </div>

              </div>

            </div>
          </td>
        </tr>
        <tr class="header">
          <td>
            <div class="person_container hidden-xs"> </div>
          </td>
          <td>
            <table class="wallchart-header">
              <thead>
              <tr id="daysofmonth-container">    <th class="initial day-header">
                <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                <span class="wkday ">T</span>
              </th>
                <th> </th>
                <th class="initial daqqqqy-header">
                  <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                  <span class="wkday ">W</span>
                </th>
                <th> </th>
                <th class="initial day-header">
                  <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                  <span class="wkday ">T</span>
                </th>
                <th> </th>
                <th class="initial day-header">
                  <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                  <span class="wkday ">F</span>
                </th>
                <th> </th>
                <th class="initial day-header">
                  <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                  <span class="wkday ">S</span>
                </th>
                <th> </th>
                <th class="initial day-header">
                  <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                  <span class="wkday ">S</span>
                </th>
                <th> </th>
                <th class="initial day-header">
                  <span class="dayfilter"><i class="material-icons">expand_more</i> </span>
                  <span class="wkday ">M</span>
                </th>
                <th> </th>
              </tr>
              </thead>
            </table>
          </td>
        </tr>
        </thead>
        <tbody id="users-container"><tr data-username="Leo Pavlovski" data-department="190956" data-userid="973698" data-canmanage="true" data-isdeptmanager="true" data-canfavourite="" data-isfavourite="false" class="user-list" style=""><th class="person"><div><div class="person_container"><span class="favourite-user hidden-xs " data-toggle="tooltip" data-placement="right" title="Add to favourites" data-favourite="false"><i class="material-icons">star_border</i></span><span class="imgcircle mh3-ns">LP
                        <span class="allowance-remaining" id="">
                            16
                        </span></span><div class="dept hidden-xs"><a href="/calendar/973698" class="person cal-link" data-year="2023">Leo Pavlovski</a><br><span class="description">
                        Bridge
                    </span></div><div class="mobile-person"><a href="/calendar/973698" class="person cal-link" data-year="2023"><div>Leo</div><div>Pavlovski</div></a></div></div></div></th><td class="days-container"><table><tbody><tr><td class="first day  " data-month="8" data-year="2023"><span>1</span></td><td class="second day  "></td><td class="first day  "><span>2</span></td><td class="second day  "></td><td class="first day  "><span>3</span></td><td class="second day  "></td><td class="first day  "><span>4</span></td><td class="second day  "></td><td class="first nwd  "><span>5</span></td><td class="second nwd  "></td><td class="first nwd  "><span>6</span></td><td class="second nwd  "></td><td class="first day  "><span>7</span></td><td class="second day  "></td></tr></tbody></table></td></tr><tr data-username="Nikola Jovanoski" data-department="190956" data-userid="973700" data-canmanage="true" data-isdeptmanager="false" data-canfavourite="" data-isfavourite="false" class="user-list" style=""><th class="person"><div><div class="person_container"><span class="favourite-user hidden-xs " data-toggle="tooltip" data-placement="right" title="Add to favourites" data-favourite="false"><i class="material-icons">star_border</i></span><span class="imgcircle mh3-ns">NJ
                        <span class="allowance-remaining" id="">
                            19
                        </span></span><div class="dept hidden-xs"><a href="/calendar/973700" class="person cal-link" data-year="2023">Nikola Jovanoski</a><br><span class="description">
                        Bridge
                    </span></div><div class="mobile-person"><a href="/calendar/973700" class="person cal-link" data-year="2023"><div>Nikola</div><div>Jovanoski</div></a></div></div></div></th><td class="days-container"><table><tbody><tr><td class="first preStartDate" data-month="8" data-year="2023"><span>1</span></td><td class="second preStartDate"></td><td class="first preStartDate"><span>2</span></td><td class="second preStartDate"></td><td class="first preStartDate"><span>3</span></td><td class="second preStartDate"></td><td class="first preStartDate"><span>4</span></td><td class="second preStartDate"></td><td class="first preStartDate"><span>5</span></td><td class="second preStartDate"></td><td class="first preStartDate"><span>6</span></td><td class="second preStartDate"></td><td class="first preStartDate"><span>7</span></td><td class="second preStartDate"></td></tr></tbody></table></td></tr></tbody>
        <tfoot class="visible-xs">
        <tr>
          <th class="person">
            <div>
              <span style="width: 35px; margin: 0 5px; display: inline-block"></span>
              <div class="person_container mobile-person" style="width: 207px;"></div>
            </div>
          </th>
        </tr>
        </tfoot>
        <tfoot>
        <tr class="hidden-xs">
          <th class="person">
            <div class="person">
              <a class="imgcircle new-user mh3" href="/users?adduser=true">
                <i class="material-icons">add</i>
              </a>
              <div class="person_container">
                <a href="/users?adduser=true" class="person" id="add-new-person">New user</a><br>
                <span class="description">Add someone else</span>
              </div>
            </div>
          </th>
        </tr>
        <tr class="header admin" id="blank-state" style="display: none;">
          <td></td>
          <td>
            <div id="bs-dayfilter" style="display: none;">
              <p class="header">
                Nobody on leave
              </p>
              <p>Should be a productive day :)</p>
              <p>
                <a id="clear-dayfilter" class=""><i class="material-icons">clear</i> Clear filter</a>
              </p>
            </div>
            <div id="bs-favourites" style="display: none;">
              <i class="material-icons">star</i>
              <p class="header">You have no favourites</p>
              <p>Create a custom view of your favourite teammates <br>by selecting the star to the left of their name on the Wallchart.</p>
            </div>
          </td>
        </tr>
        <tr>
          <th id="wallchart-footer" class="bigfoot"> </th>
        </tr>
        </tfoot>
      </table>
      <MonthCalendar></MonthCalendar>

    </div>
</template>
<script>
import MonthCalendar from "./MonthCalendar.vue";


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default {
 components:{
   MonthCalendar,
 },
  mounted() {
    // Get the date-range element and arrow links
    const dateRangeElement = document.getElementById("date-range");
    const prevArrow = document.getElementById("wallchart-prev");
    const nextArrow = document.getElementById("wallchart-next");

    // Initialize the current month index
    let currentMonthIndex = 7; // Assuming August (0-indexed)

    // Update the displayed date range
    function updateDateRange() {
      const startDate = new Date(2023, currentMonthIndex, 1);
      const endDate = new Date(2023, currentMonthIndex, new Date(2023, currentMonthIndex + 1, 0).getDate());
      const dateRangeText = `${startDate.getDate()}-${monthNames[startDate.getMonth()]} — ${endDate.getDate()}-${monthNames[endDate.getMonth()]}`;
      dateRangeElement.textContent = dateRangeText;
    }

    // Update the date range when the page loads
    updateDateRange();

    // Event listener for previous month arrow
    prevArrow.addEventListener("click", () => {
      currentMonthIndex -= 1;
      if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
      }
      updateDateRange();
    });

    // Event listener for next month arrow
    nextArrow.addEventListener("click", () => {
      currentMonthIndex += 1;
      if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
      }
      updateDateRange();
    });
  },
};
</script>

<style>
/* Apply styles to the whole table */
table.wallchart-container {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ccc;
}

/* Apply styles to the table header */
table.wallchart-container thead {
  background-color: #f2f2f2;
  font-weight: bold;
}

/* Apply styles to table cells in the header */
table.wallchart-container th {
  padding: 10px;
  text-align: center;
}

/* Apply styles to the table body */
table.wallchart-container tbody {
  background-color: #fff;
}

/* Apply styles to individual rows in the table body */
table.wallchart-container tr.user-list {
  border-bottom: 1px solid #ccc;
}

/* Apply styles to cells in the table body */
table.wallchart-container td {
  padding: 10px;
  text-align: center;
}

/* Apply styles to the date range */
#date-range {
  font-weight: bold;
  font-size: 18px;
}

/* Apply styles to person containers */
.person_container {
  display: flex;
  align-items: center;
}

/* Apply styles to person avatars */
.imgcircle {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #ccc;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

/* Apply styles to favorite icons */
.favourite-user i {
  color: gold;
}

/* Apply styles to department descriptions */
.description {
  font-size: 12px;
  color: #888;
}

/* Apply styles to footer */
tfoot {
  background-color: #f2f2f2;
}

/* Apply styles to footer links */
tfoot a {
  color: #333;
  text-decoration: none;
}

/* Apply styles to footer admin section */
#blank-state {
  background-color: #fff;
  color: #888;
  text-align: center;
}

/* Apply styles to footer icons */
#blank-state i {
  font-size: 24px;
  margin-bottom: 10px;
  color: #888;
}

</style>