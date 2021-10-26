defmodule TimeManager.ManagementFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `TimeManager.Management` context.
  """

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: true,
        time: ~N[2021-10-25 09:58:00]
      })
      |> TimeManager.Management.create_clock()

    clock
  end
end
