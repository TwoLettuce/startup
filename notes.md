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

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
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

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
