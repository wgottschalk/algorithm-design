  defmodule StableMatchingTest do
  use ExUnit.Case
  alias StableMatching.Item
  doctest StableMatching

  defp generateItems(preferences, type) do
    Enum.map preferences, fn ({pref, id}) ->
      %Item{ id: id, type: type, preferences: pref}
    end
  end

  test "everyone gets match with ideal preferences" do
    preferences = [ {[1, 0], 0}, {[0, 1], 1} ]
    group_a = generateItems(preferences, "man")
    group_b = generateItems(preferences, "woman")

    expected_result = [
      {
        %Item{id: 1, type: "man", preferences: [0, 1]},
        %Item{id: 1, type: "woman", preferences: [0, 1]}
      },
      {
        %Item{id: 0, type: "man", preferences: [1, 0]},
        %Item{id: 0, type: "woman", preferences: [1, 0]}
      }
    ]

    assert StableMatching.match(group_a, group_b) == expected_result
  end

  test "forms a stable match when preferences are not aligned" do
    preferences_for_group_a = [ {[1, 0], 0}, {[0, 1], 1} ]
    preferences_for_group_b = [ {[0, 1], 0}, {[1, 0], 1} ]
    group_a = generateItems(preferences_for_group_a, "man")
    group_b = generateItems(preferences_for_group_b, "woman")

    expected_result = [
      {
        %Item{id: 1, type: "man", preferences: [0, 1]},
        %Item{id: 1, type: "woman", preferences: [1, 0]}
      },
      {
        %Item{id: 0, type: "man", preferences: [1, 0]},
        %Item{id: 0, type: "woman", preferences: [0, 1]}
      }
    ]

    assert StableMatching.match(group_a, group_b) == expected_result
  end

  test "properly matches when multiple items have the same preferences" do
    preferences_for_group_a = [ {[1, 0], 0}, {[1, 0], 1} ]
    preferences_for_group_b = [ {[1, 0], 0}, {[0, 1], 1} ]
    group_a = generateItems(preferences_for_group_a, "man")
    group_b = generateItems(preferences_for_group_b, "woman")

    expected_result = [
      {
        %Item{id: 1, type: "man", preferences: [1, 0]},
        %Item{id: 1, type: "woman", preferences: [1, 0]}
      },
      {
        %Item{id: 0, type: "man", preferences: [1, 0]},
        %Item{id: 0, type: "woman", preferences: [1, 0]}
      }
    ]

    assert StableMatching.match(group_a, group_b) == expected_result
  end
end
