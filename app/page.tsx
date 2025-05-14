"use client";
import { DashboardHeader } from "@/components/custom/DashboardHeader";
import { DraggableWidget } from "@/components/custom/DraggableWidget";
import { MarketOverview } from "@/components/custom/MarketOverview";
import { RecentTransactions } from "@/components/custom/RecentTransactions";
import { TradingChart } from "@/components/custom/TradingChart";
import { TradingChat } from "@/components/custom/TradingChat";
import { WatchList } from "@/components/custom/WatchList";
import { useState } from "react";

export default function Home() {
  const [widgets, setWidgets] = useState([
    {
      id: "chart",
      title: "Trading Chart",
      content: <TradingChart />,
      column: 1,
      order: 1,
    },
    {
      id: "marketAndWatchlist",
      title: "",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-full">
            <MarketOverview />
          </div>
          <div className="h-full">
            <WatchList />
          </div>
        </div>
      ),
      column: 1,
      order: 2,
    },
    {
      id: "chat",
      title: "Trading Chat",
      content: <TradingChat />,
      column: 1,
      order: 3,
    },
    {
      id: "transactions",
      title: "Recent Transactions",
      content: <RecentTransactions />,
      column: 1,
      order: 4,
    },
  ]);

  const column1Widgets = widgets
    .filter((widget) => widget.column === 1)
    .sort((a, b) => a.order - b.order);

  const column2Widgets = widgets
    .filter((widget) => widget.column === 2)
    .sort((a, b) => a.order - b.order);

  const moveWidget = (draggedId, targetId) => {
    if (draggedId === targetId) return;

    setWidgets((prevWidgets) => {
      const draggedWidget = prevWidgets.find((w) => w.id === draggedId);
      const targetWidget = prevWidgets.find((w) => w.id === targetId);

      if (!draggedWidget || !targetWidget) return prevWidgets;

      // Create a new array with the updated positions
      return prevWidgets.map((widget) => {
        if (widget.id === draggedId) {
          return {
            ...widget,
            column: targetWidget.column,
            order: targetWidget.order,
          };
        }
        if (widget.id === targetId) {
          return {
            ...widget,
            column: draggedWidget.column,
            order: draggedWidget.order,
          };
        }
        return widget;
      });
    });
  };

  return (
    <div className="lg:w-[80%] w-[95%] mx-auto">
      <DashboardHeader />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)] w-full">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
          <div className="grid lg:grid-cols-2 gap-6 w-full">
            {column1Widgets.map((widget) => (
              <DraggableWidget
                key={widget.id}
                id={widget.id}
                title={widget.title}
                onDrop={moveWidget}
              >
                {widget.content}
              </DraggableWidget>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
