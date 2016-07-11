defmodule StableMatching.Item do
  @moduledoc """
  This is the items that will be matched against. Each item has an id, type, and a map of preferences
  """
  defstruct [:id, :type, preferences: [], matched: false]

  def setPreferences() do

  end
end
