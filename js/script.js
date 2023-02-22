// Console strict
'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

// TITLE CLICK HANDLER

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  // console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('Href attribute get from the clicked link: ' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('TargetArticle: ' + articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('Added class active to: ' + articleSelector);
};

// GENERATE TITLE LINKS

function generateTitleLinks(customSelector = '') {


  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('Contents of titleList removed');

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('CustomSelector: ' + customSelector);
  let html = '';
  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log('article id: ' + articleId);

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('Find the title element: ' + articleTitle);

    /* [DONE] get the title from the title element */
    console.log('Title of found element: ' + articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('get the title from the title element: ' + linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links zawiera ' + links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

/* GENERATE TAGS */

function generateTags() {
  console.log('Generate tags function');
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tags = article.querySelector(optArticleTagsSelector);
    console.log('Tags wrapper ' + tags);
    console.log('optArticleTagsSelector ' + optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('Data tags: ' + articleTags);
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('Generate html for tags: ' + linkHTML);
      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      /* [DONE] END LOOP: for each tag */
      console.log('Tag test: ' + html);
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tags.innerHTML = html;
    /* END LOOP: for every article: */
  }
}
generateTags();

// TAG CLICK HANDLER

function tagClickHandler(event) {

  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Attribute href on clickedElement: ' + href);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('Clicked tag ' + tag);
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('All tag links with class active: ' + activeTags);
  /* [DONE] START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* [DONE] remove class active */
    activeTag.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Tag links with href attribute: ' + targetTags);
  /* [DONE] START LOOP: for each found tag link */
  for (let targetTag of targetTags) {
    /* [DONE] add class active */
    targetTag.classList.add('active');
    console.log('Target tag ' + targetTag);
  }  /* [DONE] END LOOP: for each found tag link */
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Show all links to tags: ' + tagLinks);
  /* [DONE] START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* [DONE] add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();

// GENERATE AUTHORS

function generateAuthors() {
  console.log('Function enabled');
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every articles */
  for (let article of articles) {
    /*  [DONE] find author wrapper */
    const authors = article.querySelector(optArticleAuthorSelector);
    // console.log('authors wrapper: ' + authors);
    /* [DONE] Make html variable with empty string */
    let html = '';
    /* [DONE] Get author from data-author attribute  */
    const articleAuthor = article.getAttribute('data-author');
    console.log('data-author: ' + articleAuthor);
    /* [DONE] Generate html of the link */
    const authorLinkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log('Generate html for authors: ' + authorLinkHTML);
    /* [DONE] Add generate code to html variable */
    html = html + authorLinkHTML;
    console.log('author test: ' + html);
    /* [DONE] Insert html of all the links into authors wrapper */
    authors.innerHTML = html;
  } /* [DONE] END LOOP: for every article  */
}
generateAuthors();




