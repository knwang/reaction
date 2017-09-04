Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api do
    resources :boards, only: [:index, :create]
  end

  get '/ui/all_boards', to: 'ui#all_boards'
  get '/ui/single_board', to: 'ui#single_board'
  get '/ui/create_board', to: 'ui#create_board'
  get '/ui', to: 'ui#index'
end
