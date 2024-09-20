# Video Dashboard

## Overview

The **Video Dashboard** project is a React application that allows users to upload, play, and analyze video files. It features a video upload component, a video player with playback rate controls, and video analytics to track user interactions.

## Features

- **Video Upload**: Supports drag-and-drop video file uploads.
- **Video Playback**: Custom video player with playback rate controls.
- **Video Analytics**: Tracks play count, pause count, and watch sections.
- **Frame Capture**: Capture and save video frames as JPEG or PNG images.
- **Video Download**: Download compressed video files.

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/sergey38202/video-dashboard.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd video-dashboard
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```
4. **Run the Development Server**:
    ```bash
    npm start
    ```
    The application will be available at [http://localhost:8080](http://localhost:8080).

## Usage

### Video Upload
1. Drag and drop a video file into the upload area or click to select a file.
2. The video will be uploaded and displayed in the video player.

### Video Player
1. Use the playback controls to play, pause, or seek through the video.
2. Adjust the playback rate using the provided buttons (0.5x, 1x, 1.5x, 2x).
3. When the video is paused, you can capture and save the current frame as an image.

### Video Analytics
- The application tracks video interactions, including play count, pause count, and watched sections.
- Analytics are displayed in the **Analytics Summary** section.



## Configuration

### Webpack
The project uses Webpack for bundling and development server configuration. The `webpack.config.js` file contains settings for:
- **Aliases**: `@` is used to reference the `src` directory.
- **Loaders**: For handling TypeScript, SCSS, and CSS files.
- **Plugins**: `HtmlWebpackPlugin` for generating the HTML file.

### TypeScript
The project uses TypeScript for static type checking. The `tsconfig.json` file is configured to support:
- **Path Aliases**: The alias `@` points to the `src` directory.
- **Strict Typing**: Enforces strict type checks and consistency.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [ReactPlayer](https://github.com/CookPete/react-player)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- [Webpack](https://webpack.js.org/)

