# Angular-Slickgrid
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and slickgrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row).

### SlickGrid Source
We will be using [6pac SlickGrid fork](https://github.com/6pac/SlickGrid/) (the most active fork since the original @mleibman fork closed it for personal reasons).

### Goal
The goal is of course to be able to run SlickGrid within Angular 4+ but also to incorporate as much as possible the entire list of functionalities that SlickGrid offers (you can see a vast list of samples on the [6pac SlickGrid examples](https://github.com/6pac/SlickGrid/wiki/Examples) website).

### NPM Package
[Angular-Slickgrid on NPM](https://www.npmjs.com/package/angular-slickgrid)

<a name="wiki"></a>

## Wiki / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Validation - Wiki](https://github.com/ghiscoding/angular-slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with.


<a name="main-features"></a>

## Main features
You can see some screenshots below and the instructions down below.

This is a work in progress, but so far here are some of the features that `angular-slickgrid` brings (on top of Slickgrid itself):
- Easier use of SlickGrid within `Angular` as it is just a component (simply pass a column definitions and a dataset and you're good to go)
- Bootstrap Theme with SASS variables for extra customization (if you create a theme, then please make a PR)
- Auto-resize, a boolean flag, will resize the datagrid viewport with available space even on browser resize (basically takes available space by the given div container)
- Server side filtering/sorting
- Server side pagination (which is another Angular component used internally)
- Server side functionalities are expandables and ships with a simple OData service
  - customizable with your own services by using `onFilterChanged()` `onPaginationChanged()` and `onSortChanged()`.
  - extra services might come in the future
- Some Features of SlickGrid itself which are working out of the gate
  - Sort/Multi-Sort (client/server side)
  - Header Row with Filters (currently support Input and Select dropdown, multi-select is planned)
  - Formatters (a few default ones were added, and you can easily create custom ones too)
  - Optimized DataView (even server side data is saved into the SlickGrid DataView)
- ... more to come

<a name="missing-features"></a>

## Missing features (planned items)
The following are SlickGrid features which are not yet included in this library
- Inline Editors
- Filters to support multi-select dropdown and eventually custom filters
- Plugins (Header Menu, Grid Menu, Column Header Buttons)

## Screenshots

Screenshots from the demo app with the `Bootstrap` theme (that is the only available theme, but there is a lot of SASS variables to make it look like Material, or others, if you wish to).

**Slickgrid example with Formatters (last column is a custom Formatter)**
![Default Slickgrid Example](/screenshots/formatters.png)

**Filter and Sort**
![Slickgrid Server Side](/screenshots/filter_and_sort.png)

**Slickgrid Example with Server Side (sorting/pagination)**
![Slickgrid Server Side](/screenshots/pagination.png)