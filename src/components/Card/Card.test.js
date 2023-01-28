import { screen } from "@testing-library/react";
import convertSecondsToTimeFormat from "../../util/convertSecondsToTimeFormat";
import { timeAgoOrDate } from "../../util/date";
import { renderWithProviders } from "../../utils/test-utils";
import Card from "./Card";

describe("if card renders main elements", () => {
  const video = {
    _id: "35dzgg4tg43g24t2gf24",
    userId: "1",
    title: "video title",
    duration: 65,
    views: 10,
    createdAt: Date.now(),
  };

  test("if link renders", () => {
    renderWithProviders(<Card video={video} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  test("if title renders", () => {
    renderWithProviders(<Card video={video} />);
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toBeInTheDocument();
  });

  test("if duration renders", () => {
    renderWithProviders(<Card video={video} />);
    const durationText = convertSecondsToTimeFormat(video.duration);
    const duration = screen.getByText(durationText);
    expect(duration).toBeInTheDocument();
  });

  test("if views renders", () => {
    renderWithProviders(<Card video={video} />);
    const views = screen.getByText(`${video.views} views`);
    expect(views).toBeInTheDocument();
  });

  test("if date renders", () => {
    renderWithProviders(<Card video={video} />);
    const createdAt = timeAgoOrDate(video.createdAt);
    const date = screen.getByText(createdAt);
    expect(date).toBeInTheDocument();
  });

  test("if username renders", async () => {
    renderWithProviders(<Card video={video} />);
    const username = await screen.findByText("John Smith");
    expect(username).toBeInTheDocument();
  });

  test("if link works", () => {
    renderWithProviders(<Card video={video} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/video/${video._id}`);
  });
});

