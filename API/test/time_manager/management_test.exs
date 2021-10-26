defmodule TimeManager.ManagementTest do
  use TimeManager.DataCase

  alias TimeManager.Management

  describe "clocks" do
    alias TimeManager.Management.Clock

    import TimeManager.ManagementFixtures

    @invalid_attrs %{status: nil, time: nil}

    test "list_clocks/0 returns all clocks" do
      clock = clock_fixture()
      assert Management.list_clocks() == [clock]
    end

    test "get_clock!/1 returns the clock with given id" do
      clock = clock_fixture()
      assert Management.get_clock!(clock.id) == clock
    end

    test "create_clock/1 with valid data creates a clock" do
      valid_attrs = %{status: true, time: ~N[2021-10-25 09:58:00]}

      assert {:ok, %Clock{} = clock} = Management.create_clock(valid_attrs)
      assert clock.status == true
      assert clock.time == ~N[2021-10-25 09:58:00]
    end

    test "create_clock/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Management.create_clock(@invalid_attrs)
    end

    test "update_clock/2 with valid data updates the clock" do
      clock = clock_fixture()
      update_attrs = %{status: false, time: ~N[2021-10-26 09:58:00]}

      assert {:ok, %Clock{} = clock} = Management.update_clock(clock, update_attrs)
      assert clock.status == false
      assert clock.time == ~N[2021-10-26 09:58:00]
    end

    test "update_clock/2 with invalid data returns error changeset" do
      clock = clock_fixture()
      assert {:error, %Ecto.Changeset{}} = Management.update_clock(clock, @invalid_attrs)
      assert clock == Management.get_clock!(clock.id)
    end

    test "delete_clock/1 deletes the clock" do
      clock = clock_fixture()
      assert {:ok, %Clock{}} = Management.delete_clock(clock)
      assert_raise Ecto.NoResultsError, fn -> Management.get_clock!(clock.id) end
    end

    test "change_clock/1 returns a clock changeset" do
      clock = clock_fixture()
      assert %Ecto.Changeset{} = Management.change_clock(clock)
    end
  end
end
