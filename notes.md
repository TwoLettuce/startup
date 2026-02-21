# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markdown](markdown.md)


## AWS

My IP address is: 100.52.161.233

In order to ssh into the server files, use the following command (after having navigated to the directory containing the private/public key pair):
```git
ssh -i 'Production Key.pem' ubuntu@100.52.161.233
```
Remember to not only deactivate your server but also to disassociate the public IP address so that you don't get charged for it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

Reminds me a lot of markdown

Works pretty much like opening and closing parentheses with text in the middle, and the type of html element and the attributes you give it make it do different things. Here's some useful ones:

anchor: <a href=\[link to webpage or subdirectory\]>\[text describing your hyperlink\]</a>

Header text: <h\[1-9\]>\[text\]</h#> where # matches whatever you put in the first one. 

Lists: <ul/ol>\[list header\] (unordered list/ordered list)

List Element: \<li>\[list element\]</li>

If I am going to need an input, I should remember the following things:

Give it a label using \<label for="some input type">Label text\</label>

Make sure that any parameters for the input such as required, value, name, id, type, etc. go in the \<input> html element, and NOT in the label.

Input elements only have one set of \<>, and end with a forward slash. 

canvas and svg are coded in the html while the other media are urls. 

## CSS

[open-source fonts](https://fonts.google.com/)

In order to prevent mobile scaling problems:
```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

Example grid in CSS
```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```


```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

## React Part 1: Routing

Key concepts: 

[NPM](https://www.npmjs.com/) - node packages

jsx - react combines javascript and html files together 

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

if  you need to compile the JSX into JavaScript, use Vite and have Vite host a hot reloading HTTP server so that you can see the result in the browser. You do this by running a variant of the NPM command named NPX. NPX will directly execute a Node package without referencing the package.json file. This is really useful for running JavaScript code that is meant to run as a command line program (CLI) such as Vite.

```shell
npx vite
```

Essential logical flow of react:

-Creating componentized representations of HTML and JavaScript.

-Storing component state as component variables.

-Reacting to the user by altering the component's state.

Routers serve to combine a multi-page web application into a single page web application that is manipulated according to user input.

## React Part 2: Reactivity

export is the equivalent of public

&& operator will evaluate the left operand, then return the right operand on true and return false otherwise. These two expressions are logically equivalent:
bool1 && expr and bool1 ? expr : null

=== is correct syntax for javascript equivalency.
