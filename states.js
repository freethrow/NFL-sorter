var sort_key = "total_rank";
var reverse = false;

var league = "all";

function change_state(new_sort_key) {
  if (new_sort_key == sort_key) {
    reverse = !reverse;
  } else {
    reverse = false;
    sort_key = new_sort_key;
  }
  return { sort_key: new_sort_key, reverse: reverse };
}

console.log(change_state("total_rank"));

console.log(change_state("total_rank"));

console.log(change_state("beer_rank"));
console.log(change_state("mcd_rank"));
console.log(change_state("mcd_rank"));
