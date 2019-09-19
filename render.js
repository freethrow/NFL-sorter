// set the bilinear color scale

var cellColor = d3.scale
  .linear()
  .domain([41, 21, 1])
  .range(["#b8327d", "#f4f4f4", "#689736"]);
console.log(cellColor(41));

var pageWidth = parseInt(d3.select(".container").style("width"), 10);

console.log("PAGE WIDTH:  ", pageWidth);

let sort_key = "total_rank";

// bind on click events to columns
beerColumn = d3.select("#beerClick");

beerColumn.on("click", function() {
  let sort_key = "beer_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

precipitationColumn = d3.select("#precipitationClick");

precipitationColumn.on("click", function() {
  let sort_key = "precipitation_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

touchdownsColumn = d3.select("#touchdownsClick");

touchdownsColumn.on("click", function() {
  let sort_key = "touchdowns_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

ticketColumn = d3.select("#ticketsClick");

ticketColumn.on("click", function() {
  let sort_key = "ticket_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

generalColumn = d3.select("#generalClick");

generalColumn.on("click", function() {
  let sort_key = "total_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

mcdColumn = d3.select("#mcdClick");

mcdColumn.on("click", function() {
  let sort_key = "mcd_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

pollutionColumn = d3.select("#pollutionClick");

pollutionColumn.on("click", function() {
  let sort_key = "pollution_rank";
  parse(sort_key);
  $(".arrow").removeClass("arrow");
  $(this)
    .children("span")
    .addClass("arrow");
});

// function to sort the data AND populate the table

function parse(sort_key) {
  d3.csv("ranks2.csv", function(error, data) {
    if (error) throw error;

    // the keys are the header rows
    var keys = d3.keys(data[0]);

    var headers = keys.filter(function(key) {
      return key != "id" && key != "sum_of_ranks" && key != "City";
    });

    data = data.sort(function(a, b) {
      return +a[sort_key] - +b[sort_key];
    });

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

  tr.append("th").html(function(d) {
    first_column = `<img class="teamlogo" src="${d.logo}" alt="${d.City}" />
                <span class="city-name">${d.City}</span><br />
                <span class="team-name">${d.Team}</span>
              </th>`;
    return first_column;
  });

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
    .attr("class", "d-none d-lg-table-cell");

  tr.append("th")
    .text(function(d) {
      return d.mcd_rank;
    })
    .style("background-color", d => cellColor(d.mcd_rank))
    .style("font-size", 0)
    .attr("class", "d-none d-lg-table-cell");

  tr.append("th")
    .text(function(d) {
      return d.pollution_rank;
    })
    .style("background-color", d => cellColor(d.pollution_rank))
    .style("font-size", 0)
    .attr("class", "d-none d-lg-table-cell");
}

$(document).ready(function() {
  parse(sort_key);
});
