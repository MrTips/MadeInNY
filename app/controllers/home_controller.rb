class HomeController < ApplicationController
  # GET /home
  # GET /home.json
  def index
    @companies = Company.all

    respond_to do |format|
      format.html
      format.json { render json: @companies }
    end
  end

  # GET /silicon
  # GET /silicon.json
  def silicon
    @silicons = Silicon.all

    respond_to do |format|
      format.html
      format.json { render json: @silicons }
    end
  end

  private
  # This is all of my private methods
  def company_params
    params.require(:company).permit(:name, :homepage_url, :category_code, :crunchbase_url, :twitter_username, :description, :founded_year, :total_money_raised, :address1, :address2, :city, :state_code, :zip_code, :latitude, :longitude, :number_of_employees)
  end

  def silicon_params
    params.require(:silicon).permit(:name, :category_code)
  end
end