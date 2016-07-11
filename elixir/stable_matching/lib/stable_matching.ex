defmodule StableMatching do
  alias StableMatching.Item
  alias StableMatching.Preferences
  @moduledoc """
  This is the Gale-Shapley Algorithm for stable matching
  """

  def match([ person_a | rest_a ], group_b) do
    person_b = person_a |> find_highest_match(group_b)

    match(rest_a, group_b, Map.put(%{}, person_a, person_b) )
  end

  def match([], _group_b, matches) do
    matches
  end

  def match([ person_a | rest_a ], group_b, matches) do
    person_b = person_a |> find_highest_match(group_b)
    cond do
      !person_b.matched ->
        match(rest_a, group_b, Map.put(matches, person_a, person_b) )



    end
  end

  defp find_highest_match(person, group) do
    {_max_value, max_index} = person.preferences
    |> Enum.with_index
    |> Enum.max

    Enum.at(group, max_index)
  end
end
