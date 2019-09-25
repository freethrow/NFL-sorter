// sorting state
var sort_key = "total_rank";
var reverse = false;
var league = "onlyCFL.csv";

// helper
var pageWidth = parseInt(d3.select(".container").style("width"), 10);

function change_state(new_sort_key) {
  if (new_sort_key == sort_key) {
    reverse = !reverse;
  } else {
    reverse = false;
    sort_key = new_sort_key;
  }
  return { sort_key: new_sort_key, reverse: reverse };
}

// set the bilinear color scale
// dynamic - to accomodate different lengths

function makeColorScale(num_teams) {
  let middle = Math.round(num_teams / 2);
  console.log("MAKING COLOR SCALE WITH:", num_teams, middle);
  return d3.scale
    .linear()
    .domain([num_teams, middle, 1])
    .range(["#b8327d", "#f4f4f4", "#689736"]);
}

// var cellColor = d3.scale
//   .linear()
//   .domain([41, 21, 1])
//   .range(["#b8327d", "#f4f4f4", "#689736"]);

// bind on click events to columns
columns = [
  "beer_rank",
  "touchdowns_rank",
  "total_rank",
  "mcd_rank",
  "pollution_rank",
  "precipitation_rank",
  "ticket_rank"
];

for (col of columns) {
  sortCol(col);
}

function sortCol(id) {
  let div_id = "#" + id;
  console.log("SELECTION:", div_id);

  selectedColumn = d3.select(div_id);
  selectedColumn.on("click", function() {
    change_state(id);
    parse(sort_key, reverse, league);
    $(".arrow_up").removeClass("arrow_up");
    $(".arrow_down").removeClass("arrow_down");

    if (reverse == true) {
      $(this)
        .children("span")
        .addClass("arrow_up");
    } else {
      $(this)
        .children("span")
        .addClass("arrow_down");
    }
  });
}

// Change the underlying dataset - league

leagueSelector = d3.select("#league").on("change", function() {
  if (this.value == "CFL") {
    var league = "onlyCFL.csv";
    parse("total_rank", false, league);
  }
  if (this.value == "all") {
    var league = "ranks2.csv";
    parse("total_rank", false, league);
  }

  if (this.value == "NFL") {
    alert("Not yet implemented! But it will work just like CFL...");
    var league = "onlyCFL.csv";
    parse("total_rank", false, league);
  }
});

/* 

precipitationColumn = d3.select("#precipitationClick");

precipitationColumn.on("click", function() {
  change_state("precipitation_rank");
  parse(sort_key, reverse);
  $(".arrow_up").removeClass("arrow_up");
  $(".arrow_down").removeClass("arrow_down");

  if (reverse == true) {
    $(this)
      .children("span")
      .addClass("arrow_up");
  } else {
    $(this)
      .children("span")
      .addClass("arrow_down");
  }
});

touchdownsColumn = d3.select("#touchdownsClick");

touchdownsColumn.on("click", function() {
  change_state("touchdowns_rank");
  parse(sort_key, reverse);
  $(".arrow_up").removeClass("arrow_up");
  $(".arrow_down").removeClass("arrow_down");

  if (reverse == true) {
    $(this)
      .children("span")
      .addClass("arrow_up");
  } else {
    $(this)
      .children("span")
      .addClass("arrow_down");
  }
});

ticketColumn = d3.select("#ticketsClick");

ticketColumn.on("click", function() {
  change_state("ticket_rank");
  parse(sort_key, reverse);
  $(".arrow_up").removeClass("arrow_up");
  $(".arrow_down").removeClass("arrow_down");

  if (reverse == true) {
    $(this)
      .children("span")
      .addClass("arrow_up");
  } else {
    $(this)
      .children("span")
      .addClass("arrow_down");
  }
});

generalColumn = d3.select("#generalClick");

generalColumn.on("click", function() {
  change_state("total_rank");
  parse(sort_key, reverse);
  $(".arrow_up").removeClass("arrow_up");
  $(".arrow_down").removeClass("arrow_down");

  if (reverse == true) {
    $(this)
      .children("span")
      .addClass("arrow_up");
  } else {
    $(this)
      .children("span")
      .addClass("arrow_down");
  }
});

mcdColumn = d3.select("#mcdClick");

mcdColumn.on("click", function() {
  change_state("mcd_rank");
  parse(sort_key, reverse);
  $(".arrow_up").removeClass("arrow_up");
  $(".arrow_down").removeClass("arrow_down");

  if (reverse == true) {
    $(this)
      .children("span")
      .addClass("arrow_up");
  } else {
    $(this)
      .children("span")
      .addClass("arrow_down");
  }
});

pollutionColumn = d3.select("#pollutionClick");

pollutionColumn.on("click", function() {
  change_state("pollution_rank");
  parse(sort_key, reverse);
  $(".arrow_up").removeClass("arrow_up");
  $(".arrow_down").removeClass("arrow_down");

  if (reverse == true) {
    $(this)
      .children("span")
      .addClass("arrow_up");
  } else {
    $(this)
      .children("span")
      .addClass("arrow_down");
  }
});
 */
// function to sort the data AND populate the table

function parse(sort_key, reverse, league) {
  console.log("Calling parse with ", league, sort_key, reverse);

  d3.csv(league, function(error, data) {
    if (error) throw error;

    // make color scale
    cellColor = makeColorScale(data.length);
    console.log("DATA LENGTH IS: ", data.length);

    if (reverse != true) {
      data = data.sort(function(a, b) {
        return +a[sort_key] - +b[sort_key];
      });
    } else {
      data = data.sort(function(a, b) {
        return +b[sort_key] - +a[sort_key];
      });
    }

    render(data);
  });
}

// RENDER TABLE
function render(data) {
  //sort the data by overall ranking
  var tr = d3
    .select("tbody")
    .selectAll("tr")
    .remove();
  // append the rows
  var tr = d3
    .select("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  // for each column append a th

  tr.append("th")
    .html(function(d) {
      first_column = `<img class="teamlogo" src="${d.logo}" alt="${d.City}" />
                <span class="city-name">${d.City}</span><br />
                <span class="team-name">${d.Team}</span>
              </th>`;
      return first_column;
    })
    .classed("first-column", true);

  tr.append("th")
    .text(function(d) {
      return d.touchdowns_rank;
    })
    .style("background-color", d => cellColor(d.touchdowns_rank))
    .style("font-size", 0);

  tr.append("th")
    .text(function(d) {
      return d.ticket_rank;
    })
    .style("background-color", d => cellColor(d.ticket_rank))
    .style("font-size", 0);

  tr.append("th")
    .text(function(d) {
      return d.precipitation_rank;
    })
    .style("background-color", d => cellColor(d.precipitation_rank))
    .style("font-size", 0);

  tr.append("th")
    .text(function(d) {
      return d.beer_rank;
    })
    .style("background-color", d => cellColor(d.beer_rank))
    .style("font-size", 0)
    .attr("class", "d-none d-xl-table-cell");

  tr.append("th")
    .text(function(d) {
      return d.mcd_rank;
    })
    .style("background-color", d => cellColor(d.mcd_rank))
    .style("font-size", 0)
    .attr("class", "d-none d-xl-table-cell");

  tr.append("th")
    .text(function(d) {
      return d.pollution_rank;
    })
    .style("background-color", d => cellColor(d.pollution_rank))
    .style("font-size", 0)
    .attr("class", "d-none d-xl-table-cell");
}

$(document).ready(function() {
  parse(sort_key, reverse, "ranks2.csv");
});
