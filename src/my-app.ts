import { ICustomElementViewModel, route } from "aurelia";

import "./css/output.css";

@route({
  routes: [
    {
      path: [""],
      component: () => import("./pages/sounds"),
    },
  ],
})
export class MyApp implements ICustomElementViewModel {}
