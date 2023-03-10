module ApplicationCable
  class Connection < ActionCable::Connection::Base
    #identified_by :current_user
    #def connect
    # app_controller = ApplicationController.new
    #token, user = request.params.values_at(:token, :user)
    #self.current_user = app_controller.authenticate_token!(token, user, true)
    #reject_unauthorized_connection unless current_user
    #end
  end
end
