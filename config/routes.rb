Rails.application.routes.draw do
  devise_for :users
  get 'graphs/index'
  root 'graphs#index'
  resource :graphs, only: %i[index create update]
  devise_scope :user do
    post 'users/guest_sign_in', to: 'users/sessions#new_guest'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
