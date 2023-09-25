// Goal: Get the logged-in user instance through a middleware
// For all services
import { UserService } from "@medusajs/medusa";
import { User } from "../../models/user";

export async function registerLoggedInUser(req, res, next) {
  let loggedInUser: User | null = null;

  if (req.user && req.user.userId) {
    const userService = req.scope.resolve("userService") as UserService;
    loggedInUser = await userService.retrieve(req.user.userId);
  }

  // registers a dependency container called `loggedInUser` which can be
  // used to inject the loggedInUser instance into a service
  req.scope.register({
    loggedInUser: {
      resolve: () => loggedInUser,
    },
  });

  next();
}
