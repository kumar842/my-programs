from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn import svm
from sklearn.metrics import accuracy_score
import numpy as np
from sklearn import cluster
import scipy, pandas
import matplotlib.pyplot as plt


#loading datasets
iris = datasets.load_iris()
digits = datasets.load_digits()
diabetes = datasets.load_diabetes()



# to plot the last image in digits
# plt.imshow(digits.images[-1], cmap=plt.cm.gray_r)

# reading features and target
iris_X = iris.data
iris_y = iris.target

diabetes_X_train = diabetes.data[:-20]
diabetes_X_test = diabetes.data[-20:]
diabetes_y_train = diabetes.target[:-20]
diabetes_y_test = diabetes.target[-20:]


# describing iris data
print('type(iris)', type(iris))
print('type(iris_data)', type(iris_X))
print('iris_data.shape', iris_X.shape)
print('feature-names : ', iris.feature_names)
print('target names : ', iris.target_names)
print('sample record', iris_X[0])
print('target data : ', iris_y)
print('target shape', iris_y.shape)
print('labels : ', np.unique(iris_y))

#split the data into train & test with 80% and 20%
iris_X_train, iris_X_test, iris_y_train, iris_y_test = train_test_split(iris_X, iris_y, test_size=0.2, random_state=4)


# svm model
svm_model = svm.SVC(kernel='linear')
svm_model.fit(iris_X_train, iris_y_train)

print('\nsvm_model : ', svm_model, '\n')
iris_y_predicted_svm = svm_model.predict(iris_X_test)
svm_accuracy = accuracy_score(iris_y_test, iris_y_predicted_svm)
print('accuracy of svm model : ', svm_accuracy)


# Logistic regression model
lr_model = LogisticRegression().fit(iris_X_train, iris_y_train)
lr_model.predict(iris_X_test)

print('\n logistic_regression_model : ', lr_model, '\n')
iris_y_predicted_lr = lr_model.predict(iris_X_test)
lr_accuracy = accuracy_score(iris_y_test, iris_y_predicted_lr)
print('accuracy of logistic regression model : ', lr_accuracy)


# K Nearest Neighbor model
knn_model = KNeighborsClassifier(n_neighbors=3)
knn_model.fit(iris_X_train, iris_y_train)

print('\n knn_model : ', knn_model, '\n')
iris_y_predicted_knn = knn_model.predict(iris_X_test)
knn_accuracy = accuracy_score(iris_y_test, iris_y_predicted_knn)
print('accuracy of knn classifier model : ', knn_accuracy)


# linear regression on diabetes data
print('\n knn_model : ', knn_model, '\n')
regr = LinearRegression().fit(diabetes_X_train, diabetes_y_train)
print('linear regession - coefficient matrix : \n', regr.coef_)

# the mean squared error
mse = np.mean((regr.predict(diabetes_X_test) - diabetes_y_test) ** 2)
print('Mean Squared Error : ', mse)



# k means clustering on the iris data
k_means = cluster.KMeans(n_clusters=3)
k_means.fit(iris_X)
print('\n kmeans model  : ', k_means)
print(k_means.labels_[::10])
print(iris_y[::10])

