// Console strict
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
};

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
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';
  console.log('Contents of titleList removed');

  /* [DONE] for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  console.log('CustomSelector: ' + customSelector);
  let html = '';
  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log('article id: ' + articleId);

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    console.log('Find the title element: ' + articleTitle);

    /* [DONE] get the title from the title element */
    console.log('Title of found element: ' + articleTitle);

    /* [DONE] create HTML of the link */
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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

/* CALCULATE TAGS PARAMS */

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times ');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
      console.log('Params max: ' + params.max);
    } if (tags[tag] < params.min) {
      params.min = tags[tag];
      console.log('Params min: ' + params.min);
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  console.log('FUNCTION ENABLED');
  const normalizedCount = count - params.min;
  console.log('Show normalizedCount: ' + normalizedCount);
  const normalizedMax = params.max - params.min;
  console.log('Show normalizedMax: ' + normalizedMax);
  const percentage = normalizedCount / normalizedMax;
  console.log('Show percentage ' + percentage);
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
  console.log('Show class number: ' + classNumber);
  return opts.cloudClassPrefix + classNumber;
}

/* GENERATE TAGS */

function generateTags() {
  console.log('Generate tags function');
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find tags wrapper */
    const tags = article.querySelector(opts.articleTagsSelector);
    console.log('Tags wrapper ' + tags);
    console.log('optArticleTagsSelector ' + opts.articleTagsSelector);

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

      // const linkHTML = '<li><a href="#tag-' + tag + '">#<span>' + tag + '</span></a></li>';
      const linkHTMLData = { tagName: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log('Generate html for tags: ' + linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      console.log('Tag test: ' + html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    } /* [DONE] END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tags.innerHTML = html;
  } /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = '';
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '">#' + tag + '</a></li>';

    // allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  } /* [NEW] END LOOP: for each tag in allTags: */
  /*[NEW] add HTML from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('Show allTagsData: ', allTagsData);
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
  } /* [DONE] END LOOP: for each active tag link */

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
  } /* [DONE] END LOOP: for each link */
}
addClickListenersToTags();

// GENERATE AUTHORS

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* [DONE] START LOOP: for every articles */
  for (let article of articles) {
    /*  [DONE] find author wrapper */
    const authors = article.querySelector(opts.articleAuthorSelector);
    console.log('authors wrapper: ' + authors);

    /* [DONE] Make html variable with empty string */
    let html = '';

    /* [DONE] Get author from data-author attribute  */
    const articleAuthor = article.getAttribute('data-author');
    console.log('data-author: ' + articleAuthor);

    /* [DONE] Generate html of the link */
    const linkHTMLData = { authorName: articleAuthor };
    console.log('show linkHTMLData ', linkHTMLData);
    const authorLinkHTML = templates.authorLink(linkHTMLData);
    console.log('Generate html for authors: ' + authorLinkHTML);

    /* [DONE] Add generate code to html variable */
    html = html + authorLinkHTML;
    console.log('author test: ' + html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthor]) {
      /* [NEW] add tag to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    console.log('show authors: ', articleAuthor);

    /* [DONE] Insert html of all the links into authors wrapper */
    authors.innerHTML = html;
  } /* [DONE] END LOOP: for every article  */

  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector(opts.authorsListSelector);

  /* [NEW] create variable for all links HTML code */
  // let allAuthorsHTML = '';
  const allAuthorsData = { author: [] };

  /* [NEW] START LOOP: for each tag in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    // const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>';
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author]
    });
    // allAuthorsHTML += authorLinkHTML;

  } /* [NEW] END LOOP: for each author in allAuthors: */
  /*[NEW] add HTML from allAuthorsHTML to authorList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('Show authorList.innerHTML: ', authorList);
}
generateAuthors();

//  AUTHOR CLICK HANDLER

function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('Get attribute href on clickedElement: ' + href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('Clicked author ' + author);

  /* [DONE] find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('All active authors ' + activeAuthors);

  /* [DONE] START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  }  /* END LOOP: for each active author link */

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found author link */
  for (let targetAuthor of targetAuthors) {
    /* [DONE] add class active */
    targetAuthor.classList.add('active');
    console.log('Target author ' + targetAuthor);
  } /* [DONE] END LOOP: for each found author link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  console.log('GenerateTitleLinks: ', generateTitleLinks);
}
function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log('Author links ' + authorLinks);

  /* [DONE] START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* [DONE] add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    // console.log('show authorLink: ', authorLink);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();




