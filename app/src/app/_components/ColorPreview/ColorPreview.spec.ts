import { formatArgments } from "./ColorPreview";
import { describe, expect, it } from "vitest";

describe("ColorPreview", () => {
  it("format Argments", () => {
    const data = [
      {
        name: "red",
        value: 0.076,
        color: "#e24848",
      },
      {
        name: "red-yellow",
        value: 0.005,
        color: "#e88b2f",
      },
      {
        name: "yellow",
        value: 0.002,
        color: "#d9d007",
      },
      {
        name: "yellow-green",
        value: 0.001,
        color: "#b7f13b",
      },
      {
        name: "green",
        value: 0.0,
        color: "#31bf31",
      },
      {
        name: "green-cyan",
        value: 0.003,
        color: "#31eb8e",
      },
      {
        name: "cyan",
        value: 0.385,
        color: "#26e3e3",
      },
      {
        name: "cyan-blue",
        value: 0.368,
        color: "#469bf0",
      },
      {
        name: "blue",
        value: 0.084,
        color: "#3a4be4",
      },
      {
        name: "blue-purple",
        value: 0.015,
        color: "#7f35c9",
      },
      {
        name: "purple",
        value: 0.017,
        color: "#d153d1",
      },
      {
        name: "purple-red",
        value: 0.045,
        color: "#e44796",
      },
    ];
    const result = formatArgments(data);
    expect(result).toEqual({
      data: [
        {
          name: "red",
          value: 0.076,
        },
        {
          name: "red-yellow",
          value: 0.005,
        },
        {
          name: "yellow",
          value: 0.002,
        },
        {
          name: "yellow-green",
          value: 0.001,
        },
        {
          name: "green",
          value: 0.0,
        },
        {
          name: "green-cyan",
          value: 0.003,
        },
        {
          name: "cyan",
          value: 0.385,
        },
        {
          name: "cyan-blue",
          value: 0.368,
        },
        {
          name: "blue",
          value: 0.084,
        },
        {
          name: "blue-purple",
          value: 0.015,
        },
        {
          name: "purple",
          value: 0.017,
        },
        {
          name: "purple-red",
          value: 0.045,
        },
      ],
      colors: [
        "#e24848",
        "#e88b2f",
        "#d9d007",
        "#b7f13b",
        "#31bf31",
        "#31eb8e",
        "#26e3e3",
        "#469bf0",
        "#3a4be4",
        "#7f35c9",
        "#d153d1",
        "#e44796",
      ],
      categories: [
        "red",
        "red-yellow",
        "yellow",
        "yellow-green",
        "green",
        "green-cyan",
        "cyan",
        "cyan-blue",
        "blue",
        "blue-purple",
        "purple",
        "purple-red",
      ],
    });
  });
});
