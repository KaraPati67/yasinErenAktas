import fetch from 'node-fetch'; // node-fetch paketini yükle: npm install node-fetch

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    posts.forEach(post => {
      console.log(`${post.id}: ${post.title}`);
    });
  } catch (error) {
    console.error('Hata:', error);
  }
}

fetchPosts();