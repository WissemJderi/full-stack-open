//a dummy function that receives an array of blog posts as a parameter and always returns the value 1
// Array -> 1
const dummy = (blogs) => {
  return 1;
};

// Array -> Number
// returns the total sum of likes in all of the blog posts given
const totalLikes = (blogs) => {
  const sumReducer = (accumulator, currentBlog) =>
    accumulator + currentBlog.likes;

  const totalSum = blogs.reduce(sumReducer, 0);
  return totalSum;
};

// Blogs[array] -> Blogs[object]
// return the most liked blog
const mostLiked = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const mostLikedBlog = blogs.reduce((max, current) => {
    return max.likes > current.likes ? max : current;
  });
  return mostLikedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  mostLiked,
};
