Rails.application.routes.draw do
  root to: 'home#index'

  get '/ui/all_boards', to: 'ui#all_boards'
  get '/ui/single_board', to: 'ui#single_board'
end
