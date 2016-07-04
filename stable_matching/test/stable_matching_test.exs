  defmodule StableMatchingTest do
  use ExUnit.Case
  alias StableMatching.Item
  doctest StableMatching

  setup do
    preferences = [ {[1, 0], 0}, {[0, 1], 1} ]
    group_a = Enum.map preferences, fn ({pref, id}) ->
      %Item{ id: id, type: "man", preferences: pref}
    end

    group_b = Enum.map preferences, fn ({pref, id}) ->
      %Item{ id: id, type: "woman", preferences: pref}
    end

    {:ok, %{group_a: group_a, group_b: group_b}}
  end

  test "everyone gets match with ideal preferences", %{group_a: group_a, group_b: group_b} do
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
end
