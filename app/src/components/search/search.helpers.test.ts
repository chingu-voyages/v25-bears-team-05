import { getStringExcerpt } from "./search.helpers";

describe("string excerpt test", () => {
  test("functionality of excerpt module", () => {
    const sampleText =
      "The chili pepper, from Nahuatl chīlli, is the fruit of plants from the genus Capsicum which are members of the nightshade family, Solanaceae. Chili peppers are widely used in many cuisines as a spice to add heat to dishes.";
    const result = getStringExcerpt({
      threadContent: sampleText,
      queryString: "plants",
    });
    expect(result).toBe(
      "... chīlli, is the fruit of plants from the genus Capsicum ..."
    );
  });
});
