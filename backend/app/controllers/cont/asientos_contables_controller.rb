class Cont::AsientosContablesController < ApplicationController
  def index
    asiento1 = Cont::AsientoContable.first
    render json: asiento1.as_json
  end
end
