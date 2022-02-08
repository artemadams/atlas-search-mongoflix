import { Credentials, App } from "realm-web";

const APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
const BASE_URL = process.env.NEXT_PUBLIC_REALM_BASE_URL ?? "eu-central-1.aws.realm.mongodb.com";
export const REALM_GRAPHQL_ENDPOINT = `https://${BASE_URL}/api/client/v2.0/app/${APP_ID}/graphql`;

const app = new App({
    id: APP_ID,
    baseUrl: `https://${BASE_URL}`,
});

export const generateAuthHeader = async () => {
    if (!app.currentUser) {
        // If no user is logged in, log in an anonymous user
        await app.logIn(Credentials.anonymous());
    } else {
        // An already logged in user's access token might be stale. To guarantee that the token is
        // valid, we refresh the user's custom data which also refreshes their access token.
        await app.currentUser.refreshCustomData();
    }
    // Get a valid access token for the current user
    const { accessToken } = app.currentUser;

    // Set the Authorization header, preserving any other headers
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

// DOCS: example of a direct call for custom Realm functions
export const realmFunctionTemplate = async () => {
    const credentials = Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        // all functions hosted on realm for an app are exposed in the `user.functions` property
        // replace `nameOfRealmFunction` with the name of the function you want to call
        const result = await user.functions.nameOfRealmFunction();
    } catch (error) {
        console.error(error);
    }
};
