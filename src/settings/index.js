import initialSettings from './initialSettings';

const initSettings = () => {
    let settings = initialSettings;
    // Get args from process global object.
    settings.args = process.argv;
    return settings;
};

export default initSettings;