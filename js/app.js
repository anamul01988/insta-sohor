const loadPosts = async () =>{
  let data = await fetch('../data/posts.json');
  posts = await data.json();
  showPosts(posts);
}

loadPosts();
let posts=[ ];

const likedPostsId = [];
const reportedPostsId = [];

const getLikedPosts = () => {
    return posts.filter((post) => likedPostsId.includes(post.id));
};

const getReportedPosts = () => {
    return posts.filter((post) => reportedPostsId.includes(post.id));
};

const isLiked = (id) => {
    return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
  console.log(id)
    // likedPostsId.plus(id); 
    likedPostsId.push(id);
    showPosts(posts);
};

const reportPost = (id) => {
  console.log(id)
    reportedPostsId.push(id);
   // const remainingPosts = posts.filter((post) => !reportedPostsId.includes(post.id));
    // showPosts(remainingPosts);
    showPosts(posts);
};

const displayContent = (text) => {
  // console.log(text.length)
    return text.length < 30 ? text : text.slice(0,30)+"<span class='fw-bold'>...read more</span>";
};

const commentOfUserName = (post) => {
  for(const item of post){
    return item.user;
  }

}
const commentOfUserText = (post) => {
  for(const item of post){
    return item.text;
  }
}

const switchTab = (id) => {
  document.getElementById('bonus-content').style.display = 'none';
  console.log(id)
    if (id === "posts") {
        document.getElementById( "posts" ).style.display = "grid";
        document.getElementById( "liked" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";
        document.getElementById('bonus-content').style.display = 'block';
    } else if (id === "liked") {
        document.getElementById( "liked" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "reported" ).style.display = "none";

        displayLikedPosts();
    } 
    // else if (id === "reported") {
      else {
        document.getElementById( "reported" ).style.display = "block";
        document.getElementById( "posts" ).style.display = "none";
        document.getElementById( "liked" ).style.display = "none";

        displayReportedPosts();
      
    }
    // else{

    // }
};

const createPost = (post) => {
  // console.log(post)
  const userImg = post.userImage;
    const image = post.image;
    const div = document.createElement( "article" );
    div.classList.add( "post" );
    div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                     href="${userImg}"
                  
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${userImg}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${post.id})">
                  <i class="fa-solid fa-heart ${isLiked(post.id) && "text-danger"}"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${
                      post.id
                  })">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(post.description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                       
                     
                          ${commentOfUserName(post.comments)}
                      </a>
                      ${commentOfUserText(post.comments)}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
    return div;
};

const showPosts = (posts) => {
    const productsContainer = document.getElementById( "posts" );
    productsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = createPost(post);
        productsContainer.appendChild(div);
    });
};

const displayLikedPosts = () => {
  const takeLikedPostsId = document.getElementById( "liked" );
  takeLikedPostsId.innerHTML = "";

    const likedPosts = getLikedPosts();
    likedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "liked" ).appendChild(div);
    });
};

const displayReportedPosts = () => {
 document.getElementById( "reported" ).innerHTML ="";
    const reportedPosts = getReportedPosts();
    reportedPosts.forEach((post) => {
        const div = createPost(post);
        document.getElementById( "reported" ).appendChild(div);
    });
};

