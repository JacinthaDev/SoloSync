require "test_helper"

class ItinerariesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @itinerary = itineraries(:one)
  end

  test "should get index" do
    get itineraries_url, as: :json
    assert_response :success
  end

  test "should create itinerary" do
    assert_difference("Itinerary.count") do
      post itineraries_url, params: { itinerary: { city: @itinerary.city, country: @itinerary.country, end_date: @itinerary.end_date, start_date: @itinerary.start_date, user_id: @itinerary.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show itinerary" do
    get itinerary_url(@itinerary), as: :json
    assert_response :success
  end

  test "should update itinerary" do
    patch itinerary_url(@itinerary), params: { itinerary: { city: @itinerary.city, country: @itinerary.country, end_date: @itinerary.end_date, start_date: @itinerary.start_date, user_id: @itinerary.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy itinerary" do
    assert_difference("Itinerary.count", -1) do
      delete itinerary_url(@itinerary), as: :json
    end

    assert_response :no_content
  end
end
